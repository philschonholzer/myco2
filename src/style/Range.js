import styled from '@emotion/styled'

const Range = styled.input`
  --width: 2em;
  --height: 2em;
  --thumb-size-ratio: 1.4;
  --track-height: calc(var(--height) / var(--thumb-size-ratio));
  --track-to-thumb: calc(
    (var(--height) - var(--height) / var(--thumb-size-ratio)) / 2
  );
  -webkit-appearance: none;
  margin: var(--track-to-thumb) 0;
  width: 100%;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
    &:focus {
      background: #367ebd;
    }
  }
  &::-webkit-slider-thumb {
    position: relative;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: var(--height);
    width: var(--width);
    border-radius: 3px;
    background: #fff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: calc(var(--track-to-thumb) * -1);
  }
  &::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  &::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: var(--height);
    width: var(--width);
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: var(--height);
    width: var(--width);
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #3071a9;
  }
  &:focus::-ms-fill-upper {
    background: #367ebd;
  }
`

export default Range
