# Poggileigh

The purpose of this project was to generate an online resume/bio, so that I can use it as a means to discover client side technologies.

## What technologies were used?
The following technologies were used to develop this project, not limited to the source code:

* [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.25.5.
* [typscript](https://www.typescriptlang.org/) version 2.1.4
* [npm](https://www.npmjs.com/) version 3.10.9
* [node](https://nodejs.org/) version 6.9.2
* [bootstrap](https://v4-alpha.getbootstrap.com) version 4.0.0-alpha.6
* [font-awesome](http://fontawesome.io/) version 4.7.0
* [ansible](http://docs.ansible.com/ansible/index.html) version 2.2.0.0
* [github](https://github.com/)
* [php-fpm](http://www.php.net/) version 7.0.14
* [nginx](http://nginx.org/) version 1.10.2
* [homebrew](http://docs.brew.sh/) version 1.1.7
* [vim](http://www.vim.org/) version 7.3
* [MacDown](https://github.com/MacDownApp/macdown) Version 0.6.4 (786)

## Approach
I went through a process of building and tearing down different technologies, for 3-4 month period. Focusing on documenting my development while leveraging ansible to maintain an idempotent environment across my machines.

* I started with [AWS CloudFormation (ACF)](https://aws.amazon.com/cloudformation/) and ansible, to provision the required server environment.
* I moved to ansibilizing my OSX to be able to bootstrap my mac for a development ready environment.
* Now I was ready for discovering client side technologies.  I felt driven towards Typescript, and naturally led to Angular 2. The [tour of heroes](https://angular.io/docs/ts/latest/tutorial/) tutorial, started the ball rolling. 
* Then I crafted my own seed, starting with [npm](https://www.npmjs.com/) and empty package.json configuration file.  During this process, I discovered why certain dependencies were being required for generating a proper development environment.  There was a lot of material, due to the large set of dependencies, which constantly left me wondering if this was scalable.  Definitely very exciting material, but each with it's learning pains.  A lot of searching and debugging to get all these configuration files working together with typescript, systemjs, lite-server, jasmine, karma, etc.. I had many questions on how I should organize the code base, specifically the assets. I leveraged vim, bash scripts, and bower to help me manage the project. I arrived to where I had a CI development environment.
* Angular-cli was next, and I wanted to port over what was done in my seed to this repo.  Angular-cli solved a lot of my questions in regards to a proper file structure.  Not so friendly when trying to debug it, however I felt it is the way to go when developing Angular2 apps.
* I wanted the project to make one http request to a php service that would send an email for my contact page.  This was accomplished with nginx, and php.

## I learned that
Due to many of these technologies being in beta, it is difficult to manage a project with so many dependencies with constant changes being deployed.  The quickstart tutorial uses systemjs, and angular-cli uses webpack.  This really confused the learning process, and I spent a lot of time going into rabbit holes and pounding my head against the wall.  Debugging was complicated and cryptic; however, I find that it is all very exciting, and look forward to where this will lead.


