type ImagePreviewProps = {
  imageUrl: string;
};

function ImagePreview({ imageUrl }: ImagePreviewProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

      <img
        src={imageUrl}
        alt="Uploaded"
        className="h-[400px] w-full rounded-2xl object-cover"
      />

      <h2 className="mt-6 text-xl font-semibold text-white">
        Uploaded Image
      </h2>

      <p className="mt-2 text-gray-400">
        AI Image Analysis using ResNet18
      </p>

    </div>
  );
}

export default ImagePreview;