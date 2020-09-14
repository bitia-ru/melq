module NoDbModel
  class Base
    extend ActiveModel::Naming
    extend ActiveModel::Translation
    include ActiveModel::Validations
    include ActiveModel::Conversion
    include Validations

    def initialize(params = {})
      params.each do |attr, value|
        self.public_send("#{attr}=", value)
      end if params
    end

    def persisted?
      false
    end

    def dir
      model_name.name.constantize.send("#{model_name.plural}_dir")
    end

    def exist?
      Dir.exist?("#{dir}/#{slug}")
    end
  end
end
