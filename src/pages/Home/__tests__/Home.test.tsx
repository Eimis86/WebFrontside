import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Home} from '../index';
import {RecoilRoot} from 'recoil';
import {MemoryRouter} from 'react-router-dom';
import {useUserHubs} from '@app/store/hubs/actions';
import {useAllModels, useHighlightedModels} from '@app/store/models';


const Models = [
    {
        'id': 0,
        'category': 'Industrial',
        'prefab': 'Oil Engine',
        'name': 'Ecotec Engine',
        'description': 'A machine designed to convert one form of energy into mechanical energy The GM Ecotec engine, also known by its codename L850, is a family of all-aluminium inline-four engines, displacing between 1.4 and 2.5 litres. While these engines were based on the GM Family II engine, the architecture was substantially re-engineered for the new Ecotec application produced since 2000.',
        'model': 'https://webgl.vr.inlu.net/MobileViewerResources/GLTF/engine.glb',
        'image': 'https://webgl.vr.inlu.net/MobileViewerResources/Engine/EngineIcon.png',
        'manual': false,
        'created': 'June 2021'
    },
    {
        'id': 1,
        'category': 'Military',
        'prefab': 'Tank AMX-56',
        'name': 'AMX-56 Tank',
        'description': 'The Leclerc tank is a main battle tank built by GIAT, now Nexter of France. It was named in honour of General Philippe Leclerc de Hauteclocque, who led the French element of the drive towards Paris while in command of the Free French 2nd Armoured Division in World War II.',
        'model': 'https://webgl.vr.inlu.net/MobileViewerResources/GLTF/tank.glb',
        'image': 'https://webgl.vr.inlu.net/MobileViewerResources/Tank/TankIcon.png',
        'manual': false,
        'created': 'June 2021'
    },
    {
        'id': 4,
        'category': 'Aviation',
        'prefab': 'Quadrocopter',
        'name': 'DJI Mini 2 Drone',
        'description': 'Small drone with an integrated camera designer for high quality professional photography it weights less than 249 g, it weighs about as much as an apple and fits in the palm of your hand. max battery life of 31 minutes Mini 2 can resist 29-38kph winds and take off at a max altitude of 4,000 meters, so your footage is stable even when flying along a windy coastline or high above an alpine forest.',
        'model': 'https://webgl.vr.inlu.net/MobileViewerResources/GLTF/drone.glb',
        'image': 'https://webgl.vr.inlu.net/MobileViewerResources/Drone/DroneIcon.png',
        'manual': false,
        'created': 'June 2021'
    }
];

const Hubs = [
    {
        'id': 0,
        'name': 'ASUS',
        'image': '/resources/img/01.png'
    },
    {
        'id': 1,
        'name': 'Biogen',
        'image': '/resources/img/02.png'
    },
    {
        'id': 2,
        'name': 'Asphalt',
        'image': '/resources/img/03.png'
    },
    {
        'id': 3,
        'name': 'USA Airlines',
        'image': '/resources/img/04.png'
    },
    {
        'id': 4,
        'name': 'USA Navy',
        'image': '/resources/img/05.png'
    },
    {
        'id': 5,
        'name': 'Indoor',
        'image': '/resources/img/06.png'
    }
];

const initializeState = ({ set }: any) => {
    const hubs = useUserHubs();
    const models = useAllModels();
    const getHighlights = useHighlightedModels();

    set(models, Models);
    set(hubs, Hubs);
    set(getHighlights, ['cc9ec004-6834-4629-accc-038f61295a5e']);
};

describe('Home page', () => {
    test('if renders General Hub btn', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </RecoilRoot>
        );
        const generalHub = screen.getByRole('button', {name: /general hub/i});
        expect(generalHub).toBeDefined();
    });
    test('if renders All btn in categories', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </RecoilRoot>
        );
        const allBtn = screen.getByRole('button', {name: /all/i});
        expect(allBtn).toBeDefined();
        expect(allBtn).toBeEnabled();
    });
    test('if renders Industrial btn in categories', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </RecoilRoot>
        );
        const industrialBtn = screen.getByRole('button', {name: /industrial/i});
        expect(industrialBtn).toBeDefined();
    });
    test('if renders Military btn in categories', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </RecoilRoot>
        );
        const militaryBtn = screen.getByRole('button', {name: /military/i});
        expect(militaryBtn).toBeDefined();
    });
    test('if renders Aviation btn in categories', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </RecoilRoot>
        );
        const aviationBtn = screen.getByRole('button', {name: /aviation/i});
        expect(aviationBtn).toBeDefined();
    });
    test('if renders Favorites btn in categories', () => {
        render (
            <RecoilRoot initializeState={initializeState}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </RecoilRoot>
        );
        const favoritesBtn = screen.getByRole('button', {name: /favorites/i});
        expect(favoritesBtn).toBeDefined();
    });
});
