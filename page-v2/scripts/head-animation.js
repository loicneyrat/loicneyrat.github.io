const stage = document.querySelector("#header-stage");
const ctx = stage.getContext('2d');
const stageWidth = stage.width;
const stageHeight = stage.height;

const brainImage = new Image();
brainImage.src = "../resources/brain.png";
brainImage.setAttribute("cross-origin", "");
brainImage.onload = function() {
	let imgWidth = brainImage.width;
	let imgHeight = brainImage.height;
	percentage = 0.3;
   ctx.drawImage(brainImage, 0, 0, percentage * imgWidth, percentage * imgHeight);
};




// Loader une image ou du texte
// Récupérer les îxels grâce à ImageData
// Diviser le tableau de pixels en particules de taille à déterminer
// Diviser les particules
// Les relier