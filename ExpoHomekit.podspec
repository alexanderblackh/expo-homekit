require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'ExpoHomekit'
  s.version        = package['version']
  s.summary        = package['description']
  s.license        = package['license']
  s.authors        = package['author']
  s.homepage       = 'https://github.com/alexanderblackh/expo-homekit'
  s.platform       = :ios, '16.0'
  s.swift_versions = ['5.9']
  s.source         = { git: '' }

  s.source_files = 'ios/**/*.{swift}'

  s.dependency 'ExpoModulesCore'

  s.frameworks = 'HomeKit'
end
