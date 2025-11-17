# Run `bash --rcfile <this_file>` to start a new project-specific shell.


# Source user's usual bashrc to build on top of.
. ~/.bashrc

# Make sure we're in the right directory and load the virtualenv.
cd /home/jfox/Projects/calculator

# Display the project name in the prompt.
PS1='\[\e[1;34m\]calculator\[\e[m\]\$ '

# Do some editor configuration.
export VIMINIT="${VIMINIT+${VIMINIT} | }set et ts=4 sw=0 fp=fmt\ -p'//\ '"
alias nano="nano ${NANO} -0iET 4 -bMr 79"

# Set up nice tab-completion with `e` for quick file editing.
e() {
    ${EDITOR:-nano} "$@"
}

_e() {
    COMPREPLY=( $(git ls-files "*${2}*") )
}

complete -F _e e

# Quickly run the tests.
alias t='npm test'

# Quickly check outstanding todos.
alias todo='grep -- "- \[ ]" TODO.md'
