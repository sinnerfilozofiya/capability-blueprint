# Deploy (Jenkins → /var/www/portfolio)

The Jenkinsfile deploys by clearing `/var/www/portfolio` and copying `dist/*` into it. That directory is usually owned by `root` or `www-data`, so the **Jenkins user needs to run the deploy commands with sudo**.

## One-time setup on the Jenkins server

1. **Allow the Jenkins user to run the deploy commands without a password.**

   Edit sudoers (run as root):

   ```bash
   sudo visudo
   ```

   Add a line like this (replace `jenkins` if your Jenkins process runs as a different user):

   ```
   jenkins ALL=(ALL) NOPASSWD: /bin/rm, /bin/cp, /usr/bin/find, /bin/chown, /bin/chmod
   ```

   Save and exit. This restricts Jenkins to only those commands for sudo.

2. **Ensure the web server can read the deployed files.**

   The Jenkinsfile runs `chown -R www-data:www-data` on the project dir after copy, so nginx/apache (running as `www-data`) can serve the site. No extra step needed if your server uses `www-data`.

3. **SPA routing**

   For client-side routes (e.g. `/projects/jump-test-algorithms`) to work on reload or direct open, configure the web server to serve `index.html` for non-file requests. See `nginx-spa.conf.example` for nginx.
