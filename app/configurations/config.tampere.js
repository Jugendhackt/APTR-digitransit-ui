/* eslint-disable prefer-template */
import configMerger from '../util/configMerger';

const CONFIG = 'tampere';
const APP_TITLE = 'Nyssen reittiopas';
const APP_DESCRIPTION = 'Nyssen reittiopas';

const walttiConfig = require('./waltti').default;

const minLat = 61.16;
const maxLat = 62.31;
const minLon = 22.68;
const maxLon = 24.9;

export default configMerger(walttiConfig, {
  CONFIG,

  appBarLink: { name: 'Nysse', href: 'http://www.nysse.fi/' },

  colors: {
    primary: '#1c57cf',
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },

  title: APP_TITLE,

  textLogo: false, // title text instead of logo img

  // Navbar logo
  logo: 'tampere/tampere-logo.png',

  favicon: './sass/themes/tampere/favicon.png',

  feedIds: ['tampere'],

  geoJson: {
    layers: [
      {
        name: {
          fi: 'Vyöhykkeet',
          sv: 'Zoner',
          en: 'Zones',
        },
        url: '/assets/geojson/tre_zone_lines_20190516.geojson',
        isOffByDefault: true,
      },
    ],
    zones: {
      url: '/assets/geojson/tre_zone_areas_20190516.geojson',
    },
  },

  itinerary: {
    showZoneLimits: true,
  },

  stopCard: {
    header: {
      showZone: true,
    },
  },

  showTicketInformation: false,

  ticketInformation: {
    primaryAgencyName: 'Tampereen seudun joukkoliikenne',
  },

  ticketLink: 'http://joukkoliikenne.tampere.fi/liput-ja-hinnat.html',

  // mapping (string, lang) from OTP fare identifiers to human readable form
  fareMapping: function mapFareId(fareId, lang) {
    const count = {
      fi: ['kaksi', 'kolme', 'neljä', 'viisi', 'kuusi'],
      en: ['two', 'three', 'four', 'five', 'six'],
      sv: ['två', 'tre', 'fyra', 'fem', 'sex'],
    };

    const zone = {
      fi: 'vyöhykettä',
      en: 'zones',
      sv: 'zoner',
    };

    const ticketType = {
      fi: 'Kertalippu',
      en: 'Single ticket',
      sv: 'Enkelbiljett',
    };

    if (fareId && fareId.substring) {
      const index = Number.parseInt(
        fareId.substring(fareId.indexOf(':F') + 2),
        10,
      );
      if (Number.isNaN(index)) {
        return '';
      }
      let zoneCount;
      if (index < 6) {
        zoneCount = 0;
      } else if (index < 10) {
        zoneCount = 1;
      } else if (index < 13) {
        zoneCount = 2;
      } else if (index < 15) {
        zoneCount = 3;
      } else {
        zoneCount = 4;
      }
      return (
        ticketType[lang] + ', ' + count[lang][zoneCount] + ' ' + zone[lang]
      );
    }
    return '';
  },

  searchParams: {
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon,
  },

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
  ],

  defaultEndpoint: {
    address: 'Keskustori, Tampere',
    lat: 61.4980944,
    lon: 23.7606972,
  },

  defaultOrigins: [
    {
      icon: 'icon-icon_city',
      label: 'Keskustori, Tampere',
      lat: 61.4980944,
      lon: 23.7606972,
    },
    {
      icon: 'icon-icon_rail',
      label: 'Rautatieasema, Tampere',
      lat: 61.4984374,
      lon: 23.7730139,
    },
    {
      icon: 'icon-icon_bus',
      label: 'Linja-autoasema, Tampere',
      lat: 61.4937936,
      lon: 23.7696505,
    },
  ],

  footer: {
    content: [
      { label: `© Tampere ${walttiConfig.YEAR}` },
      {},
      {
        name: 'footer-feedback',
        nameEn: 'Submit feedback',
        href:
          'http://joukkoliikenne.tampere.fi/ohjeita-ja-tietoa/asiakaspalvelu/palaute.html',
        icon: 'icon-icon_speech-bubble',
      },
      {
        name: 'about-this-service',
        nameEn: 'About this service',
        route: '/tietoja-palvelusta',
        icon: 'icon-icon_info',
      },
    ],
  },

  aboutThisService: {
    fi: [
      {
        header: 'Tietoja palvelusta',
        paragraphs: [
          'Tervetuloa reittioppaaseen! Tämän palvelun tarjoaa Tampereen seudun joukkoliikenne (Nysse) reittisuunnittelua varten Tampereen kaupunkiseudun alueella (Kangasala, Lempäälä, Nokia, Orivesi, Pirkkala, Tampere, Vesilahti ja Ylöjärvi). Palvelu perustuu Digitransit-palvelualustaan.',
        ],
        link:
          'http://joukkoliikenne.tampere.fi/ohjeita-ja-tietoa/digipalvelut/ohje-repa-reittiopas.html',
      },
      {
        header: 'Digitransit-palvelualusta',
        paragraphs: [
          'Digitransit-palvelualusta on HSL:n ja Traficomin kehittämä avoimen lähdekoodin reititystuote.',
        ],
      },
      {
        header: 'Tietolähteet',
        paragraphs: [
          'Kartat, tiedot kaduista, rakennuksista, pysäkkien sijainnista ynnä muusta tarjoaa © OpenStreetMap contributors. Osoitetiedot tuodaan Väestörekisterikeskuksen rakennustietorekisteristä. Joukkoliikenteen reitit ja aikataulut perustuvat Nyssen tuottamaan GTFS-aineistoon.',
        ],
      },
    ],

    sv: [
      {
        header: 'Om tjänsten',
        paragraphs: [
          'Den här tjänsten erbjuds av Tampereen seudun joukkoliikenne (Nysse) för reseplanering inom Tampere region (Kangasala, Lempäälä, Nokia, Orivesi, Pirkkala, Tampere, Vesilahti ja Ylöjärvi). Tjänsten baserar sig på Digitransit-plattformen.',
        ],
      },
      {
        header: 'Digitransit-plattformen',
        paragraphs: [
          'Digitransit-plattformen är en öppen programvara utvecklad av HRT och Traficom.',
        ],
      },
      {
        header: 'Datakällor',
        paragraphs: [
          'Kartor, gator, byggnader, hållplatser och dylik information erbjuds av © OpenStreetMap contributors. Addressinformation hämtas från BRC:s byggnadsinformationsregister. Kollektivtrafikens rutter och tidtabeller är baserad på GTFS data från Nysse.',
        ],
      },
    ],

    en: [
      {
        header: 'About this service',
        paragraphs: [
          'This service is provided by Tampereen seudun Joukkoliikenne (Nysse) for route planning in Tampere region (Kangasala, Lempäälä, Nokia, Orivesi, Pirkkala, Tampere, Vesilahti ja Ylöjärvi). Service is built on Digitransit platform.',
        ],
      },
      {
        header: 'Digitransit platform',
        paragraphs: [
          'The Digitransit service platform is an open source routing platform developed by HSL and Traficom.',
        ],
      },
      {
        header: 'Data sources',
        paragraphs: [
          'Maps, streets, buildings, stop locations etc. are provided by © OpenStreetMap contributors. Address data is retrieved from the Building and Dwelling Register of the Finnish Population Register Center. Public transport routes and timetables are based on GTFS data produced by Nysse.',
        ],
      },
    ],
  },
});
