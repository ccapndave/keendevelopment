html_files = Dir.glob("*.html")

for html_file in html_files
  md_file = html_file.gsub(/.html$/, ".md")
  `npx h2m -f #{html_file} > #{md_file}`
end
