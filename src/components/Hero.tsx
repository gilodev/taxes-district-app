import Button from "./Button";

const Hero = () => {
  return (
    <div className="w-full py-15 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-8 text-blue leading-tight">
          Service de paiement des
          <br />
          taxes du District Autonome
          <br />
          d'Abidjan
        </h1>

        <p className="text-bluegray max-w-3xl mb-10 text-center text-sm leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          rhoncus orci, eu eleifend neque pellentesque non. Donec nibh massa,
          pretium eget euismod vel, tristique sit amet purus. Sed eu ultricies
          elit, non eleifend nisi. Ut id posuere nibh. In ut rhoncus libero.
          Duis iaculis augue id nisi condimentum vulputate.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            href="/enregistrer-vehicule"
            color="blue"
            weight="font-bold">
            Enregistrer mon véhicule
          </Button>
          <Button
            href="/payer-taxe"
            color="blue"
            weight="font-bold"
            padding="px-10">
            Payer ma taxe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
