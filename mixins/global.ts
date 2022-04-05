import Vue from "vue";
import { IMixinState } from '@/types/mixinsTypes'
const ApplicationHandler = () => import( '../handlers/ApplicationHandler.vue' )

export default Vue.extend( {
  components: {
    ApplicationHandler,
  },
  methods: <IMixinState> {
    getFullName ( firstName: string, lastName: string ): string {
      return `${ firstName } ${ lastName }`;
    },
    getFormatedDate ( currentDate: string, type: string ): string {
      if ( !currentDate ) return 'None';

      const date = new Date( currentDate );
      const dateTimeFormat = new Intl.DateTimeFormat( 'en', {
        year: 'numeric',
        month: type === 'long' ? 'long' : 'short',
        day: '2-digit',
      } );
      const [
        { value: month },
        ,
        { value: day },
        ,
        { value: year },
      ] = dateTimeFormat.formatToParts( date );

      return `${ day }-${ month }-${ year }`;
    },
    getNotification ( message: string, type: string ) {
      this.$message( {
        showClose: true,
        message,
        type
      } );
    }
  }
} );
