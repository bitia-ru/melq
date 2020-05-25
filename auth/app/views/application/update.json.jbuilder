json.metadata do
  json.merge! @metadata
end
if resources.present?
  json.payload do
    json.array!(resources, partial: "api/v1/#{resources_name}/#{resource_name}", as: resource_name)
  end
else
  json.payload do
    json.partial! "api/v1/#{resources_name}/#{resource_name}", locals: { resource_name => resource }
  end
end
