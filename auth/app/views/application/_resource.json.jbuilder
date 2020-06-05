json.set!(resource_name) do
  json.partial! "api/v1/#{resources_name}/#{resource_name}", locals: { resource_name => resource }
end
