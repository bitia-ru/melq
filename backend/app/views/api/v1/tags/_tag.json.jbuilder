json.merge! tag.attributes

json.merge!(_destroy: true) if defined?(destroy) && destroy
