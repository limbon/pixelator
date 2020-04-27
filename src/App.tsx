import * as React from 'react';
import { Canvas, Arts, Pallete, ToolRack, Controls } from './components';

interface Props {}

const App: React.FC<Props> = () => {
	return (
		<div
			style={{
				height: '100vh',
				display: 'grid',
				alignContent: 'center',
				justifyContent: 'center',
				gap: '1rem',
			}}
		>
			<Controls />
			<div
				style={{
					display: 'grid',
					gridAutoFlow: 'column',
					gap: '1rem',
				}}
			>
				<div
					style={{
						height: '512px',
						display: 'grid',
						gridTemplateRows: '1fr auto',
						gap: '1rem',
					}}
				>
					<ToolRack />
					<Pallete />
				</div>
				<Canvas border />
				<Arts />
			</div>
		</div>
	);
};

export default App;
