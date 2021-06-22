import { hashSync, compareSync } from 'bcryptjs';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';

type Role = 'USER' | 'RIDER';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        nullable: true,
        unique: true,
    })
    username: string;

    @Column({
        nullable: true,
    })
    name: string;

    @Column({
        default: 'USER' as Role,
        length: 30,
    })
    role: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword() {
        this.password = hashSync(this.password, 8);
    }

    checkIfPasswordMatch(unencryptedPassword: string) {
        return compareSync(unencryptedPassword, this.password);
    }
}
