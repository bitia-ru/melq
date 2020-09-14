module NoDbModel
  module Validations
    class UniquenessValidator < ActiveModel::EachValidator
      def initialize(options)
        if options[:conditions] && !options[:conditions].respond_to?(:call)
          raise ArgumentError, "#{options[:conditions]} was passed as :conditions but is not callable. " \
                               "Pass a callable instead: `conditions: -> { where(approved: true) }`"
        end
        unless Array(options[:scope]).all? { |scope| scope.respond_to?(:to_sym) }
          raise ArgumentError, "#{options[:scope]} is not supported format for :scope option. " \
            "Pass a symbol or an array of symbols instead: `scope: :user_id`"
        end
        super({ case_sensitive: true }.merge!(options))
        @klass = options[:class]
      end

      def validate_each(record, attribute, value)
        puts "validate_each"
        puts record
        puts attribute
        puts value
        puts options

        if record.exist?
          error_options = options.except(:case_sensitive, :scope, :conditions)
          error_options[:value] = value

          record.errors.add(attribute, :taken, error_options)
        end
      end
    end

    module ClassMethods
      def validates_uniqueness_of(*attr_names)
        validates_with UniquenessValidator, _merge_attributes(attr_names)
      end
    end
  end
end
