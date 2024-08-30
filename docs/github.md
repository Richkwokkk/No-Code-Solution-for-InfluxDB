# GitHub instructions
This is the GitHub instructions for general purposes.

## Structure <a name="top"></a>
[A. How to clone or pull from GitHub](#a-how-to-clone-or-pull-from-github) <br>
[B. How to checkout and switch to the branch](#b-how-to-checkout-and-switch-to-the-branch)<br>
[C. How to create a new branch](#c-how-to-create-a-new-branch)<br>
[D. You had updated in local, and need to push to GitHub](#d-you-had-updated-in-local-and-need-to-push-to-github)<br>
[E. Addditional information](#e-addditional-information)<br>


### <span style="color:cyan">A. How to clone or pull from GitHub:

#### Clone the repository:
   ```bash
   git clone https://github.cs.adelaide.edu.au/INFLUXUI-ATYSYS/InfluxUI-PG02.git  
   ```
#### Pull from the branch, if there are updates
   ```bash
   git pull origin develop
   ```
[Back to Top](#top)
### <span style="color:cyan">B. How to checkout and switch to the branch:
#### Checkout the local branch (on your local machine)
   ```bash
   git branch
   ```
#### Checkout the remote branch (on GitHub)
   ```bash
   git branch -r
   ```
#### Checkout the remote branch and local branch
   ```bash
   git branch -a
   q # to quit(leave)
   ```
[Back to Top](#top)

### <span style="color:cyan">C. How to create a new branch:
#### Create a new branch for your local development
   ```bash
   git checkout -b feature/XXXX-feature
   ```
#### Switching to the branch
   ```bash
   git checkout feature/XXXX-feature
   ```
#### Switching back to the 'develop' branch
   ```bash
   git checkout develop
   ```

[Back to Top](#top)

### <span style="color:cyan">D. You had updated in local, and need to push to GitHub:
Step-by-step:
1. In VScode, open the terminal
2. Check the status the branch
   for example: in 'develop' branch
   ```bash
   git checkout develop
   git status
   ```
3. Add all files you want to commit to GitHub:
   ```bash
   git add .
   ```
   Or add specific file by specific file name:
   ```bash
   git add file_name
   ```
4. Commit the changes to the local repository:
   ```bash
   git commit -m "type your commit message here"
   ```
5. Push the changes to the remote repository:
   ```bash
   git push origin develop
   ```
6. To GitGub project's page, refresh the page, and check the changes.

[Back to Top](#top)

### <span style="color:cyan">E. Additional information: 
If you are in a initial stage of any project, the basic git steps from your local ternimal(in VScode) to GitHub are as follows:<br>

Step-by-step:

1. open VScode terminal
2. cd to your project repository
3. initial your local git repository
   ```bash
   git init
   ```
4. add all files in the repository in local git repository cache space
   ```bash
   git add .
   ```
5. authorization username and email
   ```bash
   git config user.name "XXXXX"
   git config user.email "XXXX@XXXXX"
   ```
6. commit files to local git repository
   ```bash
   git commit -m "Initial commit"
   ```
7. to your GitHub project page <br> 
   1) create a new repository. For example, the repository name is 'todolist'<br>
   2) to 'Settings' - 'General' - scroll down - 'Danger Zone' - set repository to 'private' ('public' is for public access, anyone can access the repository.)
   3) copy the repository URL from 'Code' button, for example: https://github.com/linhan0112/todolist.git

8. connect your local git cache and your remote GitHub repository
   ```bash
   git remote add origin https://github.com/linhan0112/todolist.git
   ```
9. push local change to GitHub repository <br>
   be aware of the branch you are in: ex, in 'Main' branch:
      ```bash
      git branch -M main
      git push -u origin main
      ```
10. check status
      ```bash
      git branch
      git status
      ```
[Back to Top](#top)
