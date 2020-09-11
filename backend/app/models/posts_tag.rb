# Posts-to-tags many-to-many linking model
class PostsTag < ApplicationRecord
  belongs_to :tag
end
