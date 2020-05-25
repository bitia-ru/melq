class ApplicationRecord < ActiveRecord::Base
  include ActiveModel::Validations
  self.abstract_class = true
end
