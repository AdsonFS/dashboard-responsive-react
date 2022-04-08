import { useEffect, useRef, useState } from "react";
import LiquidFillGauge from "react-liquid-gauge";

import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';

export const LiquidGauge = ({ value }) => {
  const [maximo, setMaximo] = useState(100);
  const [valor, setValor] = useState(5);
  const liquidGaugeRef = useRef();
  const startColor = '#0059ff'; // cornflowerblue
  const endColor = '#0059ff'; // crimson

  const [raio, setRaio] = useState(0);
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(value / 100);

  useEffect(() => {
    setRaio(liquidGaugeRef.current.parentElement.clientWidth / 2);
  }, [liquidGaugeRef])


  return (
    <div ref={liquidGaugeRef}>
        <LiquidFillGauge
            style={{ margin: 'auto auto' }}
            width={raio * 2}
            height={raio * 2}
            
            value={value}
            
            textSize={1}
            textOffsetX={0}
            textOffsetY={0}
            textRenderer={(props) => {
                const radius = Math.min(props.height / 2, props.width / 2);
                const textPixels = (props.textSize * radius / 2);
                const valueStyle = {
                    fontSize: textPixels
                };
                return (
                    <tspan
                      className="value"
                      style={valueStyle}>{parseFloat(props.value).toFixed(2)}
                    </tspan>
                );
            }}
            riseAnimation
            waveAnimation
            waveFrequency={3}
            waveAmplitude={2}
            gradient
            // gradientStops={gradientStops}
            circleStyle={{
                fill: fillColor
            }}
            waveStyle={{
                fill: fillColor
            }}
            textStyle={{
                fill: color('#444').toString(),
                fontFamily: 'Arial'
            }}
            waveTextStyle={{
                fill: color('#fff').toString(),
                fontFamily: 'Arial'
            }}
            onClick={() => {
                
            }}
        />
    </div>
  );
}
