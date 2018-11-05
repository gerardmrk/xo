package cmd

import (
	libcmd "github.com/spf13/cobra"
)

type CommandFn func(cmd *libcmd.Command, args []string) error

type ProjectSettings struct{}
