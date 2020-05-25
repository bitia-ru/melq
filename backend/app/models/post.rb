class Post < ApplicationRecord
  has_many :tags
  enum can_comment: %w[authorized_only everyone nobody].each_with_object({}) { |v, a| a[v.to_sym] = v }
end
