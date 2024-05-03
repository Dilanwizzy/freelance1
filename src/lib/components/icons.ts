import type { SvelteComponent } from 'svelte';
import ILocation from '~icons/material-symbols/location-on-outline';
import IArrowRightSolid from '~icons/material-symbols/arrow-right-alt';
import IGlobe from '~icons/material-symbols/globe';
import IStarSolid from '~icons/material-symbols/star-rounded';
import ISeedSolid from '~icons/material-symbols/potted-plant-rounded';
// import IFishSolid from '~icons/material-symbols/fish';
import ISearch from '~icons/material-symbols/search-rounded';
import IFood from '~icons/material-symbols/food-bank-outline-rounded';
import IStore from '~icons/material-symbols/store-outline-rounded';
import IHealthAndBeauty from '~icons/material-symbols/health-and-beauty-outline';
import IHair from '~icons/material-symbols/face-4-outline';
// import ISearch from '~icons/material-symbols/search-rounded';
import IProfile from '~icons/material-symbols/person-rounded';
import IBusiness from '~icons/material-symbols/business-chip-outline';
import ISend from '~icons/material-symbols/send-rounded';
import IComment from '~icons/material-symbols/mode-comment-rounded';
import IHeart from '$lib/components/elements/heart.svelte';
type IconComponent = { name: string; component: typeof SvelteComponent };



export const IconList: IconComponent[] = [
	{ name: 'location-dot', component: ILocation },
	{ name: 'arrow-right', component: IArrowRightSolid },
	{ name: 'globe', component: IGlobe },
	{ name: 'star', component: IStarSolid },
	{ name: 'seed', component: ISeedSolid },
	// { name: 'fish', component: IFishSolid },
    { name: 'search', component: ISearch },
	{ name: 'food', component: IFood },
	{ name: 'shop', component: IStore },
	{ name: 'hair', component: IHair },
	{ name: 'clothes', component: ISeedSolid },
	{ name: 'health', component: IHealthAndBeauty },
	{ name: 'profile', component: IProfile },
	{ name: 'business', component: IBusiness },
	{ name: 'heart', component:  IHeart },
	{ name: 'share', component: ISend },
	{ name: 'comment', component: IComment }
];
