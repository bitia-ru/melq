json.merge! tag.attributes

if defined?(destroy) && destroy
  json.merge!(_destroy: true)
end
