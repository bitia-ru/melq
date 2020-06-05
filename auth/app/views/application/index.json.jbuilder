defined?(entities) && json.entities do
  json.partial! 'application/resources'
end
json.merge!(metadata: metadata) if defined?(metadata)
json.merge!(payload: payload) if defined?(payload)
