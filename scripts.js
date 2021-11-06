let selectedImages = [];

function loadImage(imgUrl, id) {
	let newImg = new Image;
	newImg.onload = function() { setTimeout(function() { document.querySelector(`div[data-id="${id}"]`).classList.remove('load'); }, 500); }
	newImg.src = imgUrl;
}

function render(obj) {

	const { images, container } = obj;
	let html = ``;

	images.map((image) => {
		loadImage(image.src, image.id);
		html += `<div class="load" data-id="${image.id}" data-src="${image.src}" style="background-image: url(${image.src});"></div>`;
	});

	const wrap = document.querySelector(container);
	while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
	wrap.innerHTML = html;

}

render({ images: [], container: '#magicGallery .gallery--dynamic' });
render({ images, container: '#magicGallery .gallery--static' });

function selectedImagesEvent(obj) {

	const { container } = obj;
	const temp = [];

	[].forEach.call(document.querySelectorAll(container), function (el) {
		temp.push({
			id: el.getAttribute('data-id'),
			src: el.getAttribute('data-src')
		});
	});

	return temp;

}

$(function () {
	$(`
	#magicGallery .gallery--static,
	#magicGallery .gallery--dynamic
	`).sortable({
		connectWith: ".gallery",
		stop: () => {
			selectedImages = selectedImagesEvent({ container: '#magicGallery .gallery--dynamic div' });
			console.log('selectedImages', selectedImages);

			console.log('unselectedImages', selectedImagesEvent({ container: '#magicGallery .gallery--static div' }));

		}
	}).disableSelection();
});