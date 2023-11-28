import React, { useEffect, useRef, useState } from 'react';
import { Football } from './themes/football';
import { Beach } from './themes/beach';
import { Night } from './themes/night';
import { Farm } from './themes/farm';
import { Seaside } from './themes/seaside';
import { Sunset } from './themes/sunset';
import { Ranch } from './themes/ranch';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import './App.scss'

enum Theme {
  FOOTBALL = 'Football',
  FARM = 'Farmland',
  NIGHT = 'Night',
  BEACH = 'Beach',
  SEASIDE = 'Seaside',
  SUNSET = 'Sunset',
  RANCH = 'Ranch',
}

const App: React.FC = () => {

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? (savedTheme as Theme) : Theme.FOOTBALL;
  })

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleChange = (event: SelectChangeEvent<Theme>) => {
    const newTheme = event.target.value as Theme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    clearCanvas(canvas, context); // cleanup before rendering new theme

    switch (theme) {
      case Theme.FOOTBALL:
        const football_instance = new Football();
        football_instance.drawFootballPitchAll(canvas, context);
        break;
      case Theme.BEACH:
        const beach_instance = new Beach();
        beach_instance.drawBeachAll(canvas, context);
        break;
      case Theme.NIGHT:
        const night_instance = new Night();
        night_instance.drawNightAll(canvas, context);
        break;
      case Theme.FARM:
        const farm_instance = new Farm();
        farm_instance.drawFarmAll(canvas, context);
        break;
      case Theme.SEASIDE:
        const seaside_instance = new Seaside();
        seaside_instance.drawSeasideAll(canvas, context);
        break;
      case Theme.SUNSET:
        const sunset_instance = new Sunset();
        sunset_instance.drawSunsetAll(canvas, context);
        break;
      case Theme.RANCH:
        const basketball_instance = new Ranch();
        basketball_instance.drawRanchAll(canvas, context);
        break;
      default:
        break;
    }
  }, [theme]);

  return (
    <div className='DifferentThemes'>
      <canvas ref={canvasRef} width={800} height={600} />
      <FormControl variant="outlined" className="FormControl">
        <InputLabel id="demo-simple-select-label">Theme</InputLabel>
        <Select
          onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={Theme.FOOTBALL}
          value={theme}
          label="Theme"
        >
          <MenuItem value={Theme.FOOTBALL}>Football Court</MenuItem>
          <MenuItem value={Theme.FARM}>Farmland</MenuItem>
          <MenuItem value={Theme.NIGHT}>Night</MenuItem>
          <MenuItem value={Theme.BEACH}>Beach</MenuItem>
          <MenuItem value={Theme.SEASIDE}>Seaside</MenuItem>
          <MenuItem value={Theme.SUNSET}>Sunset</MenuItem>
          <MenuItem value={Theme.RANCH}>Ranch</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default App;

const clearCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
