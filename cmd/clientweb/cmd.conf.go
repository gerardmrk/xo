package main

import (
	"github.com/gerardmrk/xo/cmd"
	libcmd "github.com/spf13/cobra"
)

func createConfCmd(settings *cmd.ProjectSettings) *libcmd.Command {
	var confCmd = &libcmd.Command{
		Use:   "conf",
		Short: "config subcommands",
	}

	var validateConfCmd = &libcmd.Command{
		Use:   "validate",
		Short: "validate config and settings",
		RunE:  validateConf(settings),
	}

	confCmd.AddCommand(validateConfCmd)

	return confCmd
}

func validateConf(settings *cmd.ProjectSettings) cmd.CommandFn {
	return func(cmd *libcmd.Command, args []string) error {
		return nil
	}
}
