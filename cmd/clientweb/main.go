package main

import (
	"fmt"
	"os"

	"github.com/gerardmrk/xo/cmd"
	libcmd "github.com/spf13/cobra"
)

var rootCmd = &libcmd.Command{
	Use:   "xo-clientweb",
	Short: "...",
}

func main() {
	settings := &cmd.ProjectSettings{}

	confCmd := createConfCmd(settings)
	rootCmd.AddCommand(confCmd)

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
