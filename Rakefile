require 'uglifier'

task :default do
  js = Uglifier.compile(File.read("jquery.grudge.js"))
  File.open('jquery.grudge.min.js', 'w') { |f| f.write(js) }
end