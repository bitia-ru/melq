json.merge! comment.attributes

comments = @current_user.nil? ? comment.comments.where(hidden: false) : comment.comments
json.comments do
  json.array!(comments, partial: 'api/v1/comments/comment', as: 'comment')
end
