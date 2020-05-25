json.metadata do
  json.merge! @metadata
end

json.payload do
  json.partial! "api/v1/#{resources_name}/#{resource_name}", locals: { resource_name => resource }
end
