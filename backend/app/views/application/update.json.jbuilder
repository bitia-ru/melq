defined?(entities) && json.entities do
  if resources.present?
    json.partial! 'application/resources'
  else
    json.partial! 'application/resource'
  end
end
json.merge!(metadata: metadata) if defined?(metadata)
json.merge!(payload: payload) if defined?(payload)
