defined?(entities) && json.entities do
  if resources.present?
    json.set!(resources_name) do
      json.array! resources do |r|
        json.set! resource_id_name, r[resource_id_name]
        json.merge!(_destroy: true)
      end
    end
  else
    json.set!(resource_name) do
      json.set! resource_id_name, resource[resource_id_name]
      json.merge!(_destroy: true)
    end
  end
end
json.merge!(metadata: metadata) if defined?(metadata)
json.merge!(payload: payload) if defined?(payload)
