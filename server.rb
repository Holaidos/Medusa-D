#!/usr/bin/env ruby
require 'webrick'
ROOT = '/tmp/jellyfish-final'
PORT = (ARGV[0] || 8080).to_i
server = WEBrick::HTTPServer.new(
  Port: PORT,
  BindAddress: '0.0.0.0',
  DocumentRoot: ROOT,
  Logger: WEBrick::Log.new(File::NULL),
  AccessLog: []
)
server.mount_proc '/api/health' do |req, res|
  res['Content-Type'] = 'application/json'
  res.body = '{"status":"ok","time":"' + Time.now.iso8601 + '"}'
end
trap('INT') { server.shutdown }
server.start
