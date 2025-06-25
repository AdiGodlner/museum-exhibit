

export function initListeners(camera){

    window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();

    });

}

