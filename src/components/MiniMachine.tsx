import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SIZES: Record<string, number[]> = {
  'CAR WASH': [6, 5, 6],
  'KIDDIE RIDE': [4, 4.5, 4],
  'PHOTOBOOTH': [4, 6, 4],
  'SMART FRIDGE': [4, 6, 4],
  'EV CHARGER': [3.5, 5, 3.5],
  'CIGARETTES': [4, 5.5, 4],
  'LAUNDROMAT': [4, 5, 4],
  'OCS': [3.5, 4, 3.5],
  'KIOSK': [3, 4.5, 3],
  'COFFEE': [3.5, 4.5, 3.5],
  'CANDY': [3.5, 4, 3.5],
  'SNACKS': [4, 5.5, 4],
};

export default function MiniMachine({ name }: { name: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!mountRef.current || !isVisible) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const aspect = width / height;
    
    // Orthographic Camera to match the original style
    const d = 5.5; // Zoom out enough so models fit
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 100);
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 3, 0);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // append
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.08 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);

    // Materials
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.1 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: 0xffb800, roughness: 0.3, metalness: 0.2 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
    const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.6 });

    // Machine Creators
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

    const searchName = name.toUpperCase();
    const size = SIZES[searchName] || [4, 6, 4];
    
    let machineObj: any;

    if (searchName === 'CAR WASH') {
      machineObj = createCarWash(size);
    } else if (searchName === 'KIDDIE RIDE') {
      machineObj = createHelicopter();
    } else if (searchName === 'LAUNDROMAT') {
      machineObj = createLaundromat(size);
    } else if (searchName === 'EV CHARGER') {
      machineObj = createEVCharger(size);
    } else if (searchName === 'SMART FRIDGE') {
      machineObj = createSmartFridge(size);
    } else if (searchName === 'PHOTOBOOTH') {
      machineObj = createPhotobooth(size);
    } else if (searchName === 'KIOSK') {
      machineObj = createKiosk(size);
    } else if (searchName === 'COFFEE') {
      machineObj = createCoffee(size);
    } else if (searchName === 'OCS') {
      machineObj = createOCS(size);
    } else if (searchName === 'SNACKS') {
      machineObj = createSnacks(size);
    } else if (searchName === 'CIGARETTES') {
      machineObj = createCigarettes(size);
    } else if (searchName === 'CANDY') {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 1.2, 16), baseMaterial);
      base.position.y = 0.6;
      base.castShadow = true;
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), glassMaterial);
      globe.position.y = 2.0;
      globe.castShadow = true;
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.2, 16), accentMaterial);
      cap.position.y = 2.9;
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
      machineObj = createVendingMachine(size);
    }

    const mGroup = machineObj.group;
    mGroup.position.set(0, 0, 0); 
    
    // Slightly adjust scale if necessary, but 1.2 and static rotation should fit the container better
    mGroup.scale.set(1.2, 1.2, 1.2);
    // Give it a static isometric viewing angle since we don't spin it anymore, matching the dashboard look nicely
    mGroup.rotation.y = 0; // The camera is already isometric (15,15,15 looking at 0,3,0)
    
    scene.add(mGroup);

    let animationFrameId: number;
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (machineObj.update) {
        machineObj.update(time);
      }
      
      renderer.render(scene, camera);
    };
    
    animate(0);

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      const newAspect = newWidth / newHeight;
      camera.left = -d * newAspect;
      camera.right = d * newAspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      // Extremely important to guarantee garbage collection of standard WebGL contexts
      renderer.forceContextLoss();
      renderer.dispose();
      scene.clear();
    };
  }, [name, isVisible]);

  return <div ref={mountRef} className="w-full h-full min-h-[300px]" />;
}
