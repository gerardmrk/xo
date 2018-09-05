package server

import (
	pb "github.com/gerardmrk/xo/app/clientweb/src/server/internal"
)

type RendererResponse struct {
}

func (r *RendererResponse) Read(p []byte) (n int, err error) {
	for {

	}
}

type Renderer struct {
	socketFile string
}

func InitRenderer(socketFile string) *Renderer {
	return &Renderer{
		socketFile: socketFile,
	}
}

func (r *Renderer) RenderRoute(params pb.RendererParams) error {

	// request := pb.
	return nil
}
