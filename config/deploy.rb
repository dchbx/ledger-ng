set :application, 'ledger_ng'

set :scm, :git
set :repo_url, 'https://github.com/dchbx/ledger-ng.git'
set :deploy_to, "/var/www/deployments/ledger_ng"
set :pty, true
set :format, :pretty
set :linked_files, (fetch(:linked_files, []) | ['src/environments/environment.prod.ts'])

after "deploy:publishing",  "deploy:build"

namespace :deploy do
  desc 'build application'
  task :build do
    on roles(:app), in: :sequence, wait: 5 do
      # Your build mechanism here, for example:
      execute <<-EOH
        cd /var/www/deployments/ledger_ng/current
        npm install
        ng build --prod
      EOH
    end
  end
end
