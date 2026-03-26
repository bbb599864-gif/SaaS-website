import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Machine data based on the "electro" scene
const machineData = [
  { name: 'CAR WASH', pos: [-10, 0, -10], size: [6, 5, 6], color: 0xffffff, accent: 0xffb800 },
  { name: 'KIDDIE RIDE', pos: [0, 0, -12], size: [4, 4.5, 4], color: 0xffffff, accent: 0xffb800 },
  { name: 'PHOTOBOOTH', pos: [10, 0, -10], size: [4, 6, 4], color: 0xffffff, accent: 0xffb800 },
  { name: 'SMART FRIDGE', pos: [-12, 0, 0], size: [4, 6, 4], color: 0xffffff, accent: 0xffb800 },
  { name: 'EV CHARGER', pos: [-5, 0, -3], size: [3.5, 5, 3.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'CIGARETTES', pos: [5, 0, -3], size: [4, 5.5, 4], color: 0xffffff, accent: 0xffb800 },
  { name: 'LAUNDROMAT', pos: [12, 0, 0], size: [4, 5, 4], color: 0xffffff, accent: 0xffb800 },
  { name: 'OCS', pos: [-3, 0, 5], size: [3.5, 4, 3.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'KIOSK', pos: [6, 0, 4], size: [3, 4.5, 3], color: 0xffffff, accent: 0xffb800 },
  { name: 'COFFEE', pos: [2, 0, 7], size: [3.5, 4.5, 3.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'CANDY', pos: [-6, 0, 11], size: [3.5, 4, 3.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'SNACKS', pos: [10, 0, 9], size: [4, 5.5, 4], color: 0xffffff, accent: 0xffb800 },
];

export default function Scene({ onMachineClick }: { onMachineClick?: (machineName: string) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || !labelsRef.current) return;

    labelsRef.current.innerHTML = '';

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    let width = mountRef.current.clientWidth || 800;
    let height = mountRef.current.clientHeight || 600;
    let aspect = width / height;
    const d = 10; // Zoom out slightly to fit everything
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    
    camera.position.set(15, 15, 15); // Move camera back slightly
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lighting (Brighter for that clean look)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0); // Brighter ambient
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5); // Brighter directional
    dirLight.position.set(15, 30, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // 3. Floor (Shadow Catcher)
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.08 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);

    // 4. Materials
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.1 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: 0xffb800, roughness: 0.3, metalness: 0.2 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
    const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.6 });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8b92ff, linewidth: 2, transparent: true, opacity: 0.6 });
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x8b92ff });

    // 5. Create Machines and Labels
    const machines: { name: string; mesh: THREE.Group; label: HTMLDivElement; icon: HTMLDivElement; originalY: number; currentScale: number; update: ((t: number) => void) | null }[] = [];
    
    // --- Custom 3D Models for Each Category ---

    const createVendingMachine = (size: number[]) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), baseMaterial);
      body.position.y = size[1] / 2;
      body.castShadow = true;
      
      const glass = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.8, size[1]*0.6, 0.1), glassMaterial);
      glass.position.set(0, size[1]*0.6, size[2]/2 + 0.05);
      
      const panel = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.2, size[1]*0.8, 0.1), darkMaterial);
      panel.position.set(size[0]*0.35, size[1]*0.5, size[2]/2 + 0.05);
      
      group.add(body, glass, panel);
      return { group, update: null };
    };

    const createSmartFridge = (size: number[]) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), baseMaterial);
      body.position.y = size[1]/2;
      body.castShadow = true;
      
      const door = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.9, size[1]*0.9, 0.1), glassMaterial);
      door.position.set(0, size[1]/2, size[2]/2 + 0.05);
      
      const shelfGeom = new THREE.BoxGeometry(size[0]*0.8, 0.05, size[2]*0.8);
      for(let i=1; i<4; i++) {
        const shelf = new THREE.Mesh(shelfGeom, darkMaterial);
        shelf.position.set(0, size[1] * (i/4), 0);
        group.add(shelf);
      }
      
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 0.1), darkMaterial);
      handle.position.set(size[0]*0.4, size[1]/2, size[2]/2 + 0.1);
      
      group.add(body, door, handle);
      return { group, update: null };
    };

    const createPhotobooth = (size: number[]) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), baseMaterial);
      body.position.y = size[1]/2;
      body.castShadow = true;
      
      const curtain = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.8, size[1]*0.8, 0.1), accentMaterial);
      curtain.position.set(0, size[1]*0.4, size[2]/2 + 0.05);
      
      const flash = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.4), darkMaterial);
      flash.position.set(0, size[1] + 0.2, 0);
      
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1), glassMaterial);
      lens.rotation.x = Math.PI/2;
      lens.position.set(0, size[1] + 0.2, 0.25);
      
      group.add(body, curtain, flash, lens);
      return { group, update: null };
    };

    const createKiosk = (size: number[]) => {
      const group = new THREE.Group();
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, size[1]*0.6), baseMaterial);
      stand.position.y = size[1]*0.3;
      stand.castShadow = true;
      
      const screen = new THREE.Mesh(new THREE.BoxGeometry(size[0]*1.5, size[0]*2, 0.1), darkMaterial);
      screen.position.set(0, size[1]*0.7, 0.1);
      screen.rotation.x = -Math.PI / 6;
      
      const screenInner = new THREE.Mesh(new THREE.BoxGeometry(size[0]*1.3, size[0]*1.8, 0.12), glassMaterial);
      screenInner.position.set(0, size[1]*0.7, 0.1);
      screenInner.rotation.x = -Math.PI / 6;
      
      group.add(stand, screen, screenInner);
      return { group, update: null };
    };

    const createCoffee = (size: number[]) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), baseMaterial);
      body.position.y = size[1]/2;
      body.castShadow = true;
      
      const cutout = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.6, size[1]*0.3, size[2]*0.4), darkMaterial);
      cutout.position.set(0, size[1]*0.4, size[2]/2 - 0.1);
      
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.3), accentMaterial);
      cup.position.set(0, size[1]*0.35, size[2]/2 - 0.1);
      
      const panel = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.8, size[1]*0.3, 0.05), darkMaterial);
      panel.position.set(0, size[1]*0.8, size[2]/2 + 0.02);
      
      group.add(body, cutout, cup, panel);
      return { group, update: null };
    };

    const createOCS = (size: number[]) => {
      const group = new THREE.Group();
      const table = new THREE.Mesh(new THREE.BoxGeometry(size[0]*1.2, 0.1, size[2]*1.2), baseMaterial);
      table.position.y = 0.8;
      table.castShadow = true;
      
      const legs = [ [-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6] ];
      legs.forEach(l => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), darkMaterial);
        leg.position.set(l[0], 0.4, l[1]);
        group.add(leg);
      });
      
      const machine = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1, 0.8), darkMaterial);
      machine.position.set(0, 1.3, -0.2);
      
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.3), glassMaterial);
      pot.position.set(0, 0.95, 0.2);
      
      group.add(table, machine, pot);
      return { group, update: null };
    };

    const createSnacks = (size: number[]) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), baseMaterial);
      body.position.y = size[1]/2;
      body.castShadow = true;
      
      const glass = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.9, size[1]*0.7, 0.1), glassMaterial);
      glass.position.set(0, size[1]*0.6, size[2]/2 + 0.05);
      
      const snacksGroup = new THREE.Group();
      const colors = [0xff4444, 0x44ff44, 0x4444ff, 0xffaa00];
      for(let r=0; r<4; r++) {
        for(let c=0; c<3; c++) {
          const snack = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.2), new THREE.MeshStandardMaterial({color: colors[(r+c)%colors.length]}));
          snack.position.set(-0.6 + c*0.6, size[1]*0.35 + r*0.4, size[2]/2 - 0.1);
          snacksGroup.add(snack);
        }
      }
      
      const bottomPanel = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.9, size[1]*0.2, 0.1), darkMaterial);
      bottomPanel.position.set(0, size[1]*0.15, size[2]/2 + 0.05);
      
      group.add(body, glass, snacksGroup, bottomPanel);
      return { group, update: null };
    };

    const createCigarettes = (size: number[]) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), darkMaterial);
      body.position.y = size[1]/2;
      body.castShadow = true;
      
      const front = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.9, size[1]*0.9, 0.1), baseMaterial);
      front.position.set(0, size[1]/2, size[2]/2 + 0.05);
      
      const slots = new THREE.Group();
      for(let i=1; i<6; i++) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.8, 0.02, 0.12), darkMaterial);
        line.position.set(0, size[1] * (i/6), size[2]/2 + 0.05);
        slots.add(line);
      }
      
      group.add(body, front, slots);
      return { group, update: null };
    };

    const createHelicopter = () => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(1, 1, 4, 16), baseMaterial);
      body.rotation.z = Math.PI / 2;
      body.position.y = 2;
      body.castShadow = true;
      group.add(body);
      
      const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), glassMaterial);
      cockpit.rotation.z = -Math.PI / 2;
      cockpit.position.set(-0.5, 2, 0);
      group.add(cockpit);

      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 2, 8), baseMaterial);
      tail.rotation.z = Math.PI / 2;
      tail.position.set(1.5, 2, 0);
      group.add(tail);

      const rotorGroup = new THREE.Group();
      rotorGroup.position.set(0, 2.8, 0);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4), darkMaterial);
      rotorGroup.add(mast);
      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.05, 0.2), darkMaterial);
      blade1.position.y = 0.2;
      rotorGroup.add(blade1);
      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 4), darkMaterial);
      blade2.position.y = 0.2;
      rotorGroup.add(blade2);
      group.add(rotorGroup);

      const base = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.5), accentMaterial);
      base.position.y = 0.25;
      base.castShadow = true;
      group.add(base);
      
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1), darkMaterial);
      pillar.position.y = 1;
      group.add(pillar);

      return { group, update: (t: number) => { rotorGroup.rotation.y -= 0.1; } };
    };

    const createCarWash = (size: number[]) => {
      const group = new THREE.Group();
      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, size[1], size[2]), baseMaterial);
      leftWall.position.set(-size[0]/2 + 0.25, size[1]/2, 0);
      leftWall.castShadow = true;
      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, size[1], size[2]), baseMaterial);
      rightWall.position.set(size[0]/2 - 0.25, size[1]/2, 0);
      rightWall.castShadow = true;
      const roof = new THREE.Mesh(new THREE.BoxGeometry(size[0], 0.5, size[2]), baseMaterial);
      roof.position.set(0, size[1] - 0.25, 0);
      roof.castShadow = true;
      const accent = new THREE.Mesh(new THREE.BoxGeometry(size[0]*1.02, 0.5, size[2]*1.02), accentMaterial);
      accent.position.set(0, size[1] - 0.25, 0);
      group.add(leftWall, rightWall, roof, accent);

      const brushMat = new THREE.MeshStandardMaterial({ color: 0x4444ff, roughness: 0.8 });
      const brush1 = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, size[1] - 0.5, 16), brushMat);
      brush1.position.set(-1, size[1]/2, 0);
      const brush2 = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, size[1] - 0.5, 16), brushMat);
      brush2.position.set(1, size[1]/2, 0);
      const topBrush = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, size[0] - 1, 16), brushMat);
      topBrush.rotation.z = Math.PI / 2;
      topBrush.position.set(0, size[1] - 1, 0);
      group.add(brush1, brush2, topBrush);

      return { group, update: (t: number) => { 
        brush1.rotation.y += 0.05; 
        brush2.rotation.y -= 0.05; 
        topBrush.rotation.x += 0.05;
      }};
    };

    const createLaundromat = (size: number[]) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), baseMaterial);
      body.position.y = size[1] / 2;
      body.castShadow = true;
      group.add(body);

      const drumMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.2 });
      const drums: THREE.Mesh[] = [];
      
      for(let i=0; i<2; i++) {
        for(let j=0; j<2; j++) {
          const door = new THREE.Group();
          door.position.set(-size[0]*0.25 + j*size[0]*0.5, size[1] * 0.3 + i * size[1] * 0.4, size[2]/2 + 0.05);
          
          const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 16, 32), accentMaterial);
          const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 32), glassMaterial);
          glass.rotation.x = Math.PI / 2;
          
          const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.1, 16), drumMat);
          drum.rotation.x = Math.PI / 2;
          drum.position.z = -0.1;
          
          door.add(rim, glass, drum);
          group.add(door);
          drums.push(drum);
        }
      }

      return { group, update: (t: number) => {
        drums.forEach(d => d.rotation.y += 0.05);
      }};
    };

    const createEVCharger = (size: number[]) => {
      const group = new THREE.Group();
      
      const chargerBody = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), baseMaterial);
      chargerBody.position.y = size[1] / 2;
      chargerBody.castShadow = true;
      
      const screen = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.6, size[1]*0.3, 0.1), darkMaterial);
      screen.position.set(0, size[1]*0.7, size[2]/2 + 0.05);
      
      group.add(chargerBody, screen);

      const carGroup = new THREE.Group();
      carGroup.position.set(3, 0, 0);
      
      const carBody = new THREE.Mesh(new THREE.BoxGeometry(2, 0.8, 4), baseMaterial);
      carBody.position.y = 0.6;
      carBody.castShadow = true;
      carGroup.add(carBody);
      
      const carTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 2), darkMaterial);
      carTop.position.set(0, 1.3, -0.2);
      carTop.castShadow = true;
      carGroup.add(carTop);

      const wheelGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
      wheelGeom.rotateZ(Math.PI / 2);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
      
      const positions = [[-1, 0.4, 1.2], [1, 0.4, 1.2], [-1, 0.4, -1.2], [1, 0.4, -1.2]];
      positions.forEach(p => {
        const w = new THREE.Mesh(wheelGeom, wheelMat);
        w.position.set(p[0], p[1], p[2]);
        w.castShadow = true;
        carGroup.add(w);
      });

      group.add(carGroup);
      return { group, update: null };
    };

    machineData.forEach((data) => {
      let machineObj;
      
      if (data.name === 'CAR WASH') {
        machineObj = createCarWash(data.size);
      } else if (data.name === 'KIDDIE RIDE') {
        machineObj = createHelicopter();
      } else if (data.name === 'LAUNDROMAT') {
        machineObj = createLaundromat(data.size);
      } else if (data.name === 'EV CHARGER') {
        machineObj = createEVCharger(data.size);
      } else if (data.name === 'SMART FRIDGE') {
        machineObj = createSmartFridge(data.size);
      } else if (data.name === 'PHOTOBOOTH') {
        machineObj = createPhotobooth(data.size);
      } else if (data.name === 'KIOSK') {
        machineObj = createKiosk(data.size);
      } else if (data.name === 'COFFEE') {
        machineObj = createCoffee(data.size);
      } else if (data.name === 'OCS') {
        machineObj = createOCS(data.size);
      } else if (data.name === 'SNACKS') {
        machineObj = createSnacks(data.size);
      } else if (data.name === 'CIGARETTES') {
        machineObj = createCigarettes(data.size);
      } else if (data.name === 'CANDY') {
        const group = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 1.2, 16), baseMaterial);
        base.position.y = 0.6;
        base.castShadow = true;
        const globe = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), glassMaterial);
        globe.position.y = 2.0;
        globe.castShadow = true;
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.2, 16), accentMaterial);
        cap.position.y = 2.9;
        
        // Gumballs
        const gumballs = new THREE.Group();
        const ballGeom = new THREE.SphereGeometry(0.1, 8, 8);
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
        for(let i=0; i<30; i++) {
          const mat = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random()*colors.length)] });
          const ball = new THREE.Mesh(ballGeom, mat);
          ball.position.set((Math.random()-0.5)*1, (Math.random()-0.5)*1, (Math.random()-0.5)*1);
          gumballs.add(ball);
        }
        gumballs.position.y = 2.0;
        
        group.add(base, globe, cap, gumballs);
        machineObj = { group, update: (t: number) => { gumballs.rotation.y += 0.01; } };
      } else {
        machineObj = createVendingMachine(data.size);
      }

      const group = machineObj.group;
      group.position.set(data.pos[0], data.pos[1], data.pos[2]);
      group.scale.set(1, 1, 1); // Start at normal size
      scene.add(group);

      const label = document.createElement('div');
      label.className = 'absolute text-[9px] sm:text-[11px] font-bold text-gray-800 tracking-widest whitespace-nowrap pointer-events-none select-none transition-opacity duration-300';
      label.style.transformOrigin = 'center center';
      label.style.transform = 'translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)';
      label.textContent = data.name;
      labelsRef.current?.appendChild(label);

      const icon = document.createElement('div');
      icon.className = 'absolute w-10 h-10 bg-[#8b92ff]/20 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto hover:bg-[#8b92ff]/40 transition-colors border border-[#8b92ff]/30 group';
      icon.style.transformOrigin = 'center center';
      icon.style.transform = 'translate(-50%, -50%)';
      icon.innerHTML = `
        <div class="w-4 h-4 bg-[#8b92ff] rounded-full shadow-[0_0_12px_rgba(139,146,255,0.9)] group-hover:scale-125 transition-transform flex items-center justify-center animate-pulse">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </div>
      `;
      
      icon.onmouseenter = () => { hoveredMachine = data.name; };
      icon.onmouseleave = () => { hoveredMachine = null; };
      icon.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onMachineClick) onMachineClick(data.name);
      };
      labelsRef.current?.appendChild(icon);

      group.userData = { isMachine: true, name: data.name };
      group.children.forEach(child => {
        child.userData = { isMachine: true, name: data.name };
      });

      machines.push({ 
        name: data.name,
        mesh: group, 
        label, 
        icon, 
        originalY: data.pos[1],
        currentScale: 1.0,
        update: machineObj.update 
      });
    });

    const centerLogo = document.createElement('div');
    centerLogo.className = 'absolute text-4xl sm:text-6xl font-black text-[#1a1a1a] tracking-tighter pointer-events-none select-none flex items-center opacity-80';
    centerLogo.style.transformOrigin = 'center center';
    centerLogo.style.transform = 'translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)';
    centerLogo.innerHTML = `elecc<span class="relative inline-flex items-center justify-center"><span class="absolute w-8 h-8 sm:w-12 sm:h-12 bg-[#ffb800] rounded-full -z-10"></span>t</span>ro`;
    labelsRef.current?.appendChild(centerLogo);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const paths = [
      [machineData[0].pos, [-8, 0, -12], machineData[2].pos],
      [machineData[1].pos, [0, 0, -10], [-8, 0, -12]],
      [machineData[3].pos, [-14, 0, -4], machineData[4].pos, [0, 0, -4], machineData[5].pos, machineData[6].pos],
      [machineData[7].pos, [0, 0, 6], machineData[8].pos],
      [machineData[10].pos, [-6, 0, 8], [0, 0, 8], machineData[9].pos],
      [machineData[11].pos, [12, 0, 4], machineData[8].pos],
      [[-8, 0, -12], [-8, 0, -4]],
      [[0, 0, -4], [0, 0, 0]],
      [[0, 0, 6], [0, 0, 0]],
      [[0, 0, 8], [0, 0, 6]],
    ];

    paths.forEach(path => {
      const points = path.map(p => new THREE.Vector3(p[0], 0, p[2]));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      networkGroup.add(line);

      points.forEach(p => {
        const nodeGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
        const node = new THREE.Mesh(nodeGeom, nodeMaterial);
        node.position.copy(p);
        networkGroup.add(node);
      });
    });

    // Scattered items
    const coinGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xffb800, metalness: 0.8, roughness: 0.2 });
    const cardGeom = new THREE.BoxGeometry(0.6, 0.02, 0.4);
    const cardMat = new THREE.MeshStandardMaterial({ color: 0xffb800, roughness: 0.4 });
    const phoneGeom = new THREE.BoxGeometry(0.4, 0.05, 0.8);
    const phoneMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const cashGeom = new THREE.BoxGeometry(0.8, 0.1, 0.4);
    const cashMat = new THREE.MeshStandardMaterial({ color: 0x88cc88, roughness: 0.8 });

    const scatterItems = [
      { geom: coinGeom, mat: coinMat, count: 8 },
      { geom: cardGeom, mat: cardMat, count: 4 },
      { geom: phoneGeom, mat: phoneMat, count: 3 },
      { geom: cashGeom, mat: cashMat, count: 4 },
    ];

    const scatteredMeshes: THREE.Mesh[] = [];
    scatterItems.forEach(item => {
      for(let i=0; i<item.count; i++) {
        const mesh = new THREE.Mesh(item.geom, item.mat);
        mesh.position.set((Math.random() - 0.5) * 30, 0.05, (Math.random() - 0.5) * 30);
        mesh.rotation.x = Math.random() * 0.1;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * 0.1;
        mesh.castShadow = true;
        scene.add(mesh);
        scatteredMeshes.push(mesh);
      }
    });

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 20;
    let targetY = 20;
    let hoveredMachine: string | null = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouse.x = mouseX;
      mouse.y = mouseY;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      let newHovered = null;
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.isMachine) {
          newHovered = intersects[i].object.userData.name;
          break;
        }
      }
      hoveredMachine = newHovered;
      
      if (mountRef.current) {
        mountRef.current.style.cursor = hoveredMachine ? 'pointer' : 'default';
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (hoveredMachine && onMachineClick) {
        onMachineClick(hoveredMachine);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('click', handleClick);

    let animationFrameId: number;
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      targetX = 15 + mouseX * 1.5;
      targetY = 15 + mouseY * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Animate machines
      machines.forEach((m, i) => {
        // Hover Scale
        const isHovered = hoveredMachine === m.name;
        const targetScale = isHovered ? 1.15 : 1.0;
        m.currentScale += (targetScale - m.currentScale) * 0.15;
        m.mesh.scale.set(m.currentScale, m.currentScale, m.currentScale);
        
        // Floating
        m.mesh.position.y = m.originalY + Math.sin(time * 2 + i) * 0.2;
        
        // Custom animations (helicopter blades, car wash brushes, etc.)
        if (m.update) m.update(time);
      });

      // Animate scattered items
      scatteredMeshes.forEach((m, i) => {
        m.rotation.y += 0.01;
        m.position.y = 0.2 + Math.sin(time * 3 + i) * 0.1;
      });

      renderer.render(scene, camera);

      if (mountRef.current) {
        const w = mountRef.current.clientWidth || 800;
        const h = mountRef.current.clientHeight || 600;

        machines.forEach((m) => {
          tempV.copy(m.mesh.position);
          tempV.x += 2.5;
          tempV.z += 2.5;
          tempV.y = 5.5; // Raised label slightly
          tempV.project(camera);
          
          const labelX = (tempV.x * 0.5 + 0.5) * w;
          const labelY = (tempV.y * -0.5 + 0.5) * h;
          m.label.style.left = `${labelX}px`;
          m.label.style.top = `${labelY}px`;
          m.label.style.opacity = hoveredMachine === m.name ? '1' : '0.7';

          tempV.copy(m.mesh.position);
          tempV.x += 1.5;
          tempV.z -= 1.5;
          tempV.y = 7.5; // Raised icon slightly
          tempV.project(camera);
          
          const iconX = (tempV.x * 0.5 + 0.5) * w;
          const iconY = (tempV.y * -0.5 + 0.5) * h;
          m.icon.style.left = `${iconX}px`;
          m.icon.style.top = `${iconY}px`;
        });

        tempV.set(0, 0, 0);
        tempV.project(camera);
        const logoX = (tempV.x * 0.5 + 0.5) * w;
        const logoY = (tempV.y * -0.5 + 0.5) * h;
        centerLogo.style.left = `${logoX}px`;
        centerLogo.style.top = `${logoY}px`;
      }
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || 800;
      const h = mountRef.current.clientHeight || 600;
      const newAspect = w / h;
      
      camera.left = -d * newAspect;
      camera.right = d * newAspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(mountRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeEventListener('click', handleClick);
      }
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (labelsRef.current) {
        labelsRef.current.innerHTML = '';
      }
      renderer.dispose();
    };
  }, []);

    return (
      <div className="absolute inset-0 overflow-hidden" style={{
        backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundColor: '#fafafa'
      }}>
        <div ref={mountRef} className="absolute inset-0 z-0" />
      <div ref={labelsRef} className="absolute inset-0 z-10 pointer-events-none [&>div]:pointer-events-auto" />
      </div>
    );
}
