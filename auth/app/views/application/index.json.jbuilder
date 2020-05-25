json.metadata do
  json.merge! @metadata
end

json.payload do
  json.array!(resources, partial: "api/v1/#{resources_name}/#{resource_name}", as: resource_name)
end
