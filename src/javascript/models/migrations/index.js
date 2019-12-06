import migrate1 from './migrate1'
import migrate2 from './migrate2'
import migrate3 from './migrate3'
import migrate4 from './migrate4'

function migrations() {
    return [migrate1.apply, migrate2.apply, migrate3.apply, migrate4.apply]
}

export { migrations }
