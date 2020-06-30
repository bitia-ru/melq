module Purable
  extend ActiveSupport::Concern

  included do
    before_action do
      @resource = purable_model.name.underscore.to_sym
    end

    before_action do
      @current_user = User.find(params[:user_id]) if params.include? :user_id

      filter = purable_model_chain.inject(nil) do |m, pm|
        if m.nil?
          pm.singularize.classify.constantize
        else
          m.find(params["#{m.to_s.underscore}_id"]).send(pm.to_sym)
        end
      end

      if params[:action] == 'index'
        instance_variable_set("@#{resources_name}", filter.all)
      elsif purable_resource_params.is_a?(Array)
        resources = purable_resource_params.map do |params|
          if params[:id].present? && params[:id] != 'self'
            resource = filter.find(params[:id])
            resource.assign_attributes(params)
            resource
          else
            filter.new
          end
        end

        instance_variable_set("@#{resources_name}", resources)
      else
        id = params[:id] if params[:id].present? && params[:id] != 'self'
        if purable_resource_params.present? && purable_resource_params[:id].present?
          id = purable_resource_params[:id]
        end
        instance_variable_set("@#{resource_name}", id ? filter.find(id) : filter.new)
      end
    end
  end

  def index
    all = resources.count
    if params.include? :offset
      instance_variable_set("@#{resources_name}", resources.offset(params[:offset]))
    end
    if params.include? :limit
      instance_variable_set("@#{resources_name}", resources.limit(Integer(params[:limit])))
    end
    @metadata ||= {}
    @metadata[:all] = all unless @metadata[:all]
    respond_with(metadata: @metadata, payload: resources)
  end

  def new
    authorize resource
    respond_with(metadata: @metadata, payload: resource)
  end

  def show
    authorize resource
    respond_with(metadata: @metadata, payload: resource)
  end

  def create
    create_or_update
  end

  def update
    create_or_update
  end

  def destroy
    authorize resource
    resource.destroy!

    respond_with(metadata: @metadata, payload: resource)
  end

  private

  def pure_filter(param)
    return unless params[param].present?

    instance_variable_get("@#{resources_name}").where!(param => params[param])
  end

  def purable_resource_params
    send :"#{resource_name}_params"
  end

  def purable_model
    purable_model_chain.first.singularize.classify.constantize
  end

  def purable_model_chain
    controller_name = params[:controller]

    if defined? controller_prefix&.present?
      prefix_s = controller_prefix.map(&:to_s).join('/')
      bad_prefix = controller_name.index(prefix_s) != 0
      raise StandardError, 'bad prefix' if bad_prefix

      controller_name = controller_name.sub "#{prefix_s}/", ''
    end

    controller_name.split('/')
  end

  def create_or_update
    if purable_resource_params.is_a? Array
      purable_model.transaction do
        resources.each_with_index do |resource, i|
          authorize resource
          resource.assign_attributes(purable_resource_params[i])
          resource.save!
        end
      end
    else
      authorize resource
      resource.assign_attributes(purable_resource_params) unless purable_resource_params.nil?
      resource.save!
    end
    respond_with(metadata: @metadata, payload: resources)
  end
end
