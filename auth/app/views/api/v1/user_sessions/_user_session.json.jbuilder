json.merge!(
    user_session.attributes.reject do |attr|
      %w[user_agent valid_until success user_ip].include? attr
    end
)

json.user do
  json.partial!(
      partial: 'api/v1/users/user',
      locals: { user: user_session.user }
  )
end
