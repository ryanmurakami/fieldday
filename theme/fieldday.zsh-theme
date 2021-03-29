NEWLINE=$'\n'
PROMPT="${NEWLINE}%B%(?:%{$FG[120]%}➜ :%{$FG[199]%}➜ )"
PROMPT+=' %{$FG[209]%}%c%{$reset_color%} $(git_prompt_info)'


ZSH_THEME_GIT_PROMPT_PREFIX="%B%{$FG[153]%}git:(%{$FG[199]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$FG[153]%}) %{$FG[227]%}✗%b"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$FG[153]%})%b"