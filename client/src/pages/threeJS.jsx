import React, { useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";


function blockClick(m,c,d,selected,setSelected){
  console.log("click a block",m," "," ",c," ",d)
  setSelected(prev =>({month:m,cases:c,disease:d}))

}

function Box(props) {
  const [hovered, setHover] = useState(false);
  const { month,cases,disease,selected,setSelected } = props;

  

  return (
    <>
    <mesh
      {...props}{...props.data}
      scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      onClick={() => {
        // setSelected({ month: monthName, disease: diseaseName, cases: diseaseCases });
        setHover(!hovered);
        blockClick(month,cases,disease,selected,setSelected);
      
    
    }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
     
    >
      <boxBufferGeometry attach="geometry" args={[10, 10, 2]} />
      <meshStandardMaterial attach="material" color={props.color} />
      {hovered && (
      <group position={[0, 30, 10]}>
        <mesh>
         
          <meshBasicMaterial attach="material" color="#87CEEB" />
        </mesh>
      </group>
    ) }
    </mesh>
    
      </>
  );
}

function HeatMap(props) {
  const { data, colors ,selected ,setSelected} = props;

  
  const maxCases = Math.max(
    ...data.flatMap((month) => month.diseases.map((disease) => disease.cases))
  );

  const grid = data.flatMap((month, monthIndex) => {
    const monthName = month.month;

    return month.diseases.slice(0, 3).map((disease, diseaseIndex) => {
      const diseaseName = disease.name;
      const diseaseCases = disease.cases;
      const scaleValue = (diseaseCases / maxCases) * 5;
      const scale = [1, scaleValue * 5, 1];
      const colorIndex = Math.round(scaleValue * (colors.length - 1));
      const color = colors[colorIndex];
      const xPos = (monthIndex - data.length / 2 + 0.5) * 23;
      const yPos = (diseaseIndex - 1) * 17;

      return (
        <Box
          key={`${monthName}-${diseaseName}`}
          position={[xPos, yPos, 0]}
          scale={scale}
          color={color}
          disease ={diseaseName}
          cases={diseaseCases}
          month={monthName}
          selected={selected}
          setSelected={setSelected}
         
         
         
        />
      );
    });
  });

  return (
    <>
      <group {...props}>{grid}</group>
      
    </>
  );
}

function ThreeScene() {
const  [selected,setSelected] = useState({month:"Click a Block!",cases:0,disease:"Click a Block!"});
  const data = [
    {
      month: "January",
      diseases: [
        { name: "COVID-19", cases: 320 },
        { name: "Malaria", cases: 120 },
        { name: "Hepatitis-B", cases: 78 },
      ],
    },
    {
      month: "February",
      diseases: [
        { name: "COVID-19", cases: 280 },
        { name: "Dengue", cases: 150 },
        { name: "Malaria", cases: 100 },
      ],
    },
    {
      month: "March",
      diseases: [
        { name: "COVID-19", cases: 400 },
        { name: "Hepatitis-B", cases: 200 },
        { name: "Malaria", cases: 110 },
      ],
    },
    {
      month: "April",
      diseases: [
        { name: "COVID-19", cases: 500 },
        { name: "Dengue", cases: 250 },
        { name: "Malaria", cases: 130 },
      ],
    },
    {
      month: "May",
      diseases: [
        { name: "COVID-19", cases: 700 },
        { name: "Hepatitis-B", cases: 300 },
        { name: "Malaria", cases: 140 },
      ],
    },
    {
      month: "June",
      diseases: [
        { name: "COVID-19", cases: 800 },
        { name: "Dengue", cases: 350 },
        { name: "Malaria", cases: 160 },
      ],
    },
    {
      month: "July",
      diseases: [
        { name: "COVID-19", cases: 900 },
        { name: "Hepatitis-B", cases: 400 },
        { name: "Dengue", cases: 180 },
      ],
    },
    {
      month: "August",
      diseases: [
        { name: "COVID-19", cases: 1000 },
        { name: "Dengue", cases: 450 },
        { name: "Hepatitis-B", cases: 200 },
      ],
    },
    {
      month: "September",
      diseases: [
        { name: "COVID-19", cases: 950 },
        { name: "Hepatitis-B", cases: 350 },
        { name: "Malaria", cases: 170 },
      ],
    },
    {
      month: "October",
      diseases: [
        { name: "COVID-19", cases: 800 },
        { name: "Malaria", cases: 180 },
        { name: "Dengue", cases: 200 },
      ],
    },
    {
      month: "November",
      diseases: [
        { name: "COVID-19", cases: 650 },
        { name: "Hepatitis-B", cases: 250 },
        { name: "Malaria", cases: 220 },
      ],
    },
    {
      month: "December",
      diseases: [
        { name: "COVID-19", cases: 450 },
        { name: "Dengue", cases: 180 },
        { name: "Hepatitis-B", cases: 1200 },
      ],
    },
  ];

  const colors = [
    "#006400",
    "#2E8B57",
    "#008000",
    "#9ACD32",
    "#FFA500",
    "#FF0000",
  ];
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            flexDirection: "column",
            height: "100vh",
            top: "60px",
            position: "relative"
        }}
    >
        <div style={{ flex: "1 1 5%", height: "100%" }}>
            <Canvas
                camera={{ position: [1, 1, 35], fov: 80 }}
                style={{ width: "85%", height: "100%" }}
            >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <HeatMap data={data} colors={colors} selected={selected} setSelected={setSelected} />
            </Canvas>
        </div>

        <div id="InfoContainer" style={{
            flex: "1 1 40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            height: "25%",
            width: "100%",
            
            
        }}>
          <div id="infoPanel" style={{backgroundColor: "skyblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"inherit",
        width:"55%",
        }}>
            <label htmlFor="month" style={{ padding: "5px" }}>Month:</label>
            <div id="month" style={{ backgroundColor: "white", padding: "5px", display: "flex", alignItems: "center" }}>
                {selected.month}
            </div>
            <label htmlFor="disease" style={{ padding: "5px" }}>Disease:</label>
            <div id="disease" style={{ backgroundColor: "white", padding: "5px", display: "flex", alignItems: "center" }}>
                {selected.disease}
            </div>
            <label htmlFor="cases" style={{ padding: "5px" }}>Cases:</label>
            <div id="cases" style={{ backgroundColor: "white", padding: "5px", display: "flex", alignItems: "center" }}>
                {selected.cases}
            </div>
        </div>
    </div>
    </div>
);

}

export default ThreeScene;















