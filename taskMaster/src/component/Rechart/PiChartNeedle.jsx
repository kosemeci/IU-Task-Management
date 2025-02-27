/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';


const RADIAN = Math.PI / 180;
const data = [
    { name: 'A', value: 30, color: '#ff4d4d' }, // Açık Kırmızı (%30)
    { name: 'B', value: 20, color: '#ff9900' }, // Turuncuya geçiş (%20)
    { name: 'C', value: 20, color: '#ffcc00' }, // Sarı (%20)
    { name: 'D', value: 30, color: '#33cc33' }, // Açık Yeşil (%20)
];

const cx = 120;
const cy = 110;
const iR = 30;
const oR = 80;


class PiChartNeedle extends PureComponent {
    render() {
        const { value } = this.props;
        const needle = (value, data, cx, cy, iR, oR, color) => {
            let total = 0;
            data.forEach((v) => {
                total += v.value;
            });
            const ang = 180.0 * (1 - value / total);
            const length = (iR + 2 * oR) / 3;
            const sin = Math.sin(-RADIAN * ang);
            const cos = Math.cos(-RADIAN * ang);
            const r = 5;
            const x0 = cx + 5;
            const y0 = cy + 5;
            const xba = x0 + r * sin;
            const yba = y0 - r * cos;
            const xbb = x0 - r * sin;
            const ybb = y0 + r * cos;
            const xp = x0 + length * cos;
            const yp = y0 + length * sin;

            return [
                <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key={`circle-${data.name}`} />,
                <path key={`circle-path-${data.name}`} d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
            ];
        };

        return (
            <PieChart width={250} height={150}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                {needle(value, data, cx, cy, iR, oR, '#00000')}
            </PieChart>
        );
    }
}
export default PiChartNeedle;
