/** Sections reachable from the primary navigation. */
export type NavId = 'about' | 'techStack' | 'projects';

/**
 * A single entry in the primary navigation. The label is not here — it lives
 * in the dictionaries, looked up by `id`, so the two can never fall out of
 * step with each other.
 */
export interface NavigationLink {
  readonly id: NavId;
  readonly href: string;
}
