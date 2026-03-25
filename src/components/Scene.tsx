import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Machine data based on the "electro" scene
const machineData = [
  { name: 'CAR WASH', pos: [-8, 0, -8], size: [4, 3, 4], color: 0xffffff, accent: 0xffb800 },
  { name: 'KIDDIE RIDE', pos: [0, 0, -10], size: [2, 2.5, 2], color: 0xffffff, accent: 0xffb800 },
  { name: 'PHOTOBOOTH', pos: [8, 0, -8], size: [2, 4, 2], color: 0xffffff, accent: 0xffb800 },
  { name: 'SMART FRIDGE', pos: [-10, 0, 0], size: [2, 4, 2], color: 0xffffff, accent: 0xffb800 },
  { name: 'EV CHARGER', pos: [-4, 0, -2], size: [1.5, 3, 1.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'CIGARETTES', pos: [4, 0, -2], size: [2, 3.5, 2], color: 0xffffff, accent: 0xffb800 },
  { name: 'LAUNDROMAT', pos: [10, 0, 0], size: [2, 3, 2], color: 0xffffff, accent: 0xffb800 },
  { name: 'OCS', pos: [-2, 0, 4], size: [1.5, 2, 1.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'KIOSK', pos: [6, 0, 3], size: [1, 2.5, 1], color: 0xffffff, accent: 0xffb800 },
  { name: 'COFFEE', pos: [2, 0, 6], size: [1.5, 2.5, 1.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'CANDY', pos: [-4, 0, 10], size: [1.5, 2, 1.5], color: 0xffffff, accent: 0xffb800 },
  { name: 'SNACKS', pos: [8, 0, 8], size: [2, 3.5, 2], color: 0xffffff, accent: 0xffb800 },
];

export default function Scene({ onMachineClick }: { onMachineClick?: (machineName: string) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || !labelsRef.current) return;

    // Clear any existing labels (prevents duplicates during HMR)
    labelsRef.current.innerHTML = '';

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    let width = mountRef.current.clientWidth || 800;
    let height = mountRef.current.clientHeight || 600;
    let aspect = width / height;
    const d = 16;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    
    // Isometric camera position
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(15, 30, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    scene.add(dirLight);

    // 3. Floor (Shadow Catcher)
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.15 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);

    // 4. Materials
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, metalness: 0.1 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: 0xffb800, roughness: 0.3, metalness: 0.2 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
    const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.6 });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9a9aab, linewidth: 2 });
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x9a9aab });

    // 5. Create Machines and Labels
    const machines: { mesh: THREE.Group; label: HTMLDivElement }[] = [];
    
    // Helper to create a generic vending machine
    const createVendingMachine = (size: number[]) => {
      const group = new THREE.Group();
      
      // Main body
      const bodyGeom = new THREE.BoxGeometry(size[0], size[1], size[2]);
      const body = new THREE.Mesh(bodyGeom, baseMaterial);
      body.position.y = size[1] / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Front panel (inset)
      const frontGeom = new THREE.BoxGeometry(size[0] * 0.8, size[1] * 0.9, size[2] * 1.02);
      const front = new THREE.Mesh(frontGeom, darkMaterial);
      front.position.y = size[1] / 2;
      group.add(front);

      // Accent stripe
      const accentGeom = new THREE.BoxGeometry(size[0] * 1.02, size[1] * 0.1, size[2] * 1.02);
      const accent = new THREE.Mesh(accentGeom, accentMaterial);
      accent.position.y = size[1] * 0.8;
      group.add(accent);

      return group;
    };

    machineData.forEach((data) => {
      let group;
      
      // Custom shapes for specific machines to add variety
      if (data.name === 'CAR WASH') {
        group = new THREE.Group();
        const size = data.size;
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
      } else if (data.name === 'CANDY') {
        group = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 1.2, 16), baseMaterial);
        base.position.y = 0.6;
        base.castShadow = true;
        const globe = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), glassMaterial);
        globe.position.y = 2.0;
        globe.castShadow = true;
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.2, 16), accentMaterial);
        cap.position.y = 2.9;
        group.add(base, globe, cap);
      } else {
        group = createVendingMachine(data.size);
      }

      group.position.set(data.pos[0], data.pos[1], data.pos[2]);
      scene.add(group);

      // Create HTML Label (Text)
      const label = document.createElement('div');
      label.className = 'absolute text-[9px] sm:text-[11px] font-bold text-gray-800 tracking-widest whitespace-nowrap pointer-events-none select-none';
      label.style.transformOrigin = 'center center';
      label.style.transform = 'translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)';
      label.textContent = data.name;
      labelsRef.current?.appendChild(label);

      // Add userData for raycaster
      group.userData = { isMachine: true, name: data.name };
      group.children.forEach(child => {
        child.userData = { isMachine: true, name: data.name };
      });

      machines.push({ mesh: group, label });
    });

    // Central "electro" Logo (Using HTML for crispness in isometric view)
    const centerLogo = document.createElement('div');
    centerLogo.className = 'absolute text-4xl sm:text-6xl font-black text-[#333333] tracking-tighter pointer-events-none select-none flex items-center';
    centerLogo.style.transformOrigin = 'center center';
    centerLogo.style.transform = 'translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)';
    centerLogo.innerHTML = `elec<span class="relative inline-flex items-center justify-center"><span class="absolute w-8 h-8 sm:w-12 sm:h-12 bg-[#ffb800] rounded-full -z-10"></span>t</span>ro`;
    labelsRef.current?.appendChild(centerLogo);

    // 6. Connections (Lines and Nodes)
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Define paths connecting machines
    const paths = [
      [machineData[0].pos, [-4, 0, -8], machineData[2].pos],
      [machineData[1].pos, [0, 0, -6], [-4, 0, -8]],
      [machineData[3].pos, [-10, 0, -4], machineData[4].pos, [0, 0, -2], machineData[5].pos, machineData[6].pos],
      [machineData[7].pos, [0, 0, 4], machineData[8].pos],
      [machineData[10].pos, [-4, 0, 6], [0, 0, 6], machineData[9].pos],
      [machineData[11].pos, [8, 0, 4], machineData[8].pos],
      // Connect branches to center
      [[-4, 0, -8], [-4, 0, -2]],
      [[0, 0, -2], [0, 0, 0]],
      [[0, 0, 4], [0, 0, 0]],
      [[0, 0, 6], [0, 0, 4]],
    ];

    paths.forEach(path => {
      const points = path.map(p => new THREE.Vector3(p[0], 0, p[2]));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      networkGroup.add(line);

      // Add nodes at joints
      points.forEach(p => {
        const nodeGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
        const node = new THREE.Mesh(nodeGeom, nodeMaterial);
        node.position.copy(p);
        networkGroup.add(node);
      });
    });

    // Scattered coins/items
    const coinGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xffb800, metalness: 0.8, roughness: 0.2 });
    
    const cardGeom = new THREE.BoxGeometry(1.2, 0.05, 0.8);
    const cardMat = new THREE.MeshStandardMaterial({ color: 0xffb800, roughness: 0.4 });
    
    const phoneGeom = new THREE.BoxGeometry(0.8, 0.1, 1.6);
    const phoneMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    
    const cashGeom = new THREE.BoxGeometry(1.5, 0.3, 0.8);
    const cashMat = new THREE.MeshStandardMaterial({ color: 0x88cc88, roughness: 0.8 });

    const scatterItems = [
      { geom: coinGeom, mat: coinMat, count: 6 },
      { geom: cardGeom, mat: cardMat, count: 3 },
      { geom: phoneGeom, mat: phoneMat, count: 2 },
      { geom: cashGeom, mat: cashMat, count: 2 },
    ];

    scatterItems.forEach(item => {
      for(let i=0; i<item.count; i++) {
        const mesh = new THREE.Mesh(item.geom, item.mat);
        mesh.position.set((Math.random() - 0.5) * 24, 0.05, (Math.random() - 0.5) * 24);
        mesh.rotation.x = Math.random() * 0.1;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * 0.1;
        mesh.castShadow = true;
        scene.add(mesh);
      }
    });

    // 7. Mouse Parallax & Click Handling
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 20;
    let targetY = 20;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update mouse for raycaster
      mouse.x = mouseX;
      mouse.y = mouseY;
      
      // Hover effect
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      let hovered = false;
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.isMachine) {
          hovered = true;
          break;
        }
      }
      if (mountRef.current) {
        mountRef.current.style.cursor = hovered ? 'pointer' : 'default';
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!mountRef.current) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.isMachine) {
          if (onMachineClick) {
            onMachineClick(intersects[i].object.userData.name);
          }
          break;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('click', handleClick);

    // 8. Animation Loop
    let animationFrameId: number;
    const tempV = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Subtle parallax camera movement
      targetX = 20 + mouseX * 2;
      targetY = 20 + mouseY * 2;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      // Update HTML Labels positions
      if (mountRef.current) {
        const w = mountRef.current.clientWidth || 800;
        const h = mountRef.current.clientHeight || 600;

        machines.forEach((m, i) => {
          // Position Text Label (below the machine)
          tempV.copy(m.mesh.position);
          tempV.x += 2; // Offset for isometric look
          tempV.z += 2;
          tempV.y = 0;
          tempV.project(camera);
          
          const labelX = (tempV.x * 0.5 + 0.5) * w;
          const labelY = (tempV.y * -0.5 + 0.5) * h;
          m.label.style.left = `${labelX}px`;
          m.label.style.top = `${labelY}px`;
        });

        // Position Center Logo
        tempV.set(0, 0, 0);
        tempV.project(camera);
        const logoX = (tempV.x * 0.5 + 0.5) * w;
        const logoY = (tempV.y * -0.5 + 0.5) * h;
        centerLogo.style.left = `${logoX}px`;
        centerLogo.style.top = `${logoY}px`;
      }
    };

    animate();

    // 9. Handle Resize
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

    // 10. Cleanup
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
    <div className="absolute inset-0 overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* HTML Overlays Container (Labels, Icons) */}
      <div ref={labelsRef} className="absolute inset-0 z-10 pointer-events-none" />
    </div>
  );
}
