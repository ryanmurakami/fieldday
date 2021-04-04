# Field Day Theme Installation

I love colors, so I created themes based on the colors in my EC2 Field Day course. Feel free to install if you want your stuff to look like mine!

## Font

I use [Overpass Mono](https://ryanlewis.link/overpass-mono) all over.

Download and install the whole family for best effect.

## Terminal

For my terminal setup, I use [iTerm2](https://iterm2.com/) and [oh my zsh](https://ohmyz.sh/). Each tool requires different installation steps.

### iTerm2

In iTerm2, go to Preferences > Profile > Colors

In the "Color Presets" dropdown, select "Import..." at the very bottom.

Navigate to the `FieldDay.itermcolors` file and select it.

In the text tab, change the "Font" to `Overpass Mono`.

Change the style to `Bold`.

Change the line height (last option) to `105`.

### oh my zsh

Copy the fieldday theme to the zsh themes directory

`cp ./fieldday.zsh-theme ~/.oh-my-zsh/themes`

Then add this to your `~/.zshrc` file

`ZSH_THEME="fieldday"`

Reload your session if needed

`source ~/.zshrc`

## VS Code

To install the VS Code theme, copy the theme to your themes directory

`cp -r ./vscode ~/.vscode/extensions/fieldaytheme`

Then restart VS Code, and change the default theme to 'Field Day'.
