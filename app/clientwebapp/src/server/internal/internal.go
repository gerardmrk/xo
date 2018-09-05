package internal

import (
	"github.com/gogo/protobuf/proto"
	"github.com/pkg/errors"
)

func MarshalRendererParams(p *RendererParams) ([]byte, error) {
	return proto.Marshal(p)
}

func UnmarshalRendererResponse(data []byte, resp *RendererResponse) error {
	if err := proto.Unmarshal(data, resp); err != nil {
		return errors.Wrap(err, "failed to decode protobuf response from renderer")
	}
	return nil
}
